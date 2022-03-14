from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import desc
from app.models import Listing, User, db

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
@login_required
def load_listings():

    listings = Listing.query.order_by(Listing.id).all()

    return jsonify([listing.to_dict() for listing in listings])


@listing_routes.route('/listing-form', methods=['POST'])
@login_required
def create_listing():
    print("FROM THE LIST API")
    data = request.json
    print("DATA POST", data)

    # user_id = data['id']
    title = data['title']
    url = data['url']
    description = data['description']

    exists = Listing.query.filter(Listing.user_id == User.id, Listing.title == title).first()
    print("API ROUTE !!!!!!", exists)

    if(exists):
        exists.title = title
        exists.url = url
        exists.description = description
        db.session.commit()
        return exists.to_dict()
    else:
        newListing = Listing(user_id=user_id, title=title, url=url, description=description)
        db.session.add(newListing)
        db.session.commit()
        return jsonify([newListing.to_dict()])
