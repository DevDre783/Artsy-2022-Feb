from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Listing, User, db

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
    user_id = request.json['user_id']
    title = request.json['title']
    url = request.json['url']
    description = request.json['description']

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
