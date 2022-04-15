from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Listing, User, Comment, db
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
@login_required
def load_listings():

    listings = Listing.query.order_by(Listing.id).all()

    return jsonify([listing.to_dict() for listing in listings])


@listing_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_listing(id):
    oneListing = Listing.query.filter(Listing.id == id).first()
    print("FROM ONE LISTING API", oneListing.id, id)

    return oneListing.to_dict()


@listing_routes.route('/listing-form', methods=['POST'])
@login_required
def create_listing():
    if "url" not in request.files:
        print("HELLO ???", request.files['url'])
        return {"errors": "image required"}, 400

    # print("--------------", request.form['user_id'])
    user_id = request.form['user_id']
    title = request.form['title']
    image = request.files['url']
    description = request.form['description']

    if not allowed_file(image.filename):
        print("!!!!!!!!!!!!!!!!!!!")
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        print("@@@@@@@@@@@@@@@@@@@@@", upload)
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    newListing = Listing(
        user_id=user_id,
        title=title,
        url=url,
        description=description
    )

    db.session.add(newListing)
    db.session.commit()

    return jsonify(newListing.to_dict())


@listing_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_listings(id):
    print("FROM PUT !", id)
    object = request.json
    print("FROM PUT !!", object)
    title = request.json["title"]
    print("FROM PUT !!!", title)

    currListing = Listing.query.get(id)
    currListing.title = title
    db.session.commit()

    return currListing.to_dict()


@listing_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_listing(id):

    currListing = Listing.query.get(id)

    db.session.delete(currListing)
    db.session.commit()

    return currListing.to_dict()
