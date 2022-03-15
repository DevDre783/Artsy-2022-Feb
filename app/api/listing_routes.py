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


@listing_routes.route('/listing-form', methods=['POST'])
@login_required
def create_listing():
    object = request.data

    print(object)
