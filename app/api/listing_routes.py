from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Listing, User, db

listing_routes = Blueprint('listings', __name__)

@listing_routes.route('/')
@login_required
def load_videos():

    listings = Listing.query.order_by(Listing.id).all()

    return jsonify([listing.to_dict() for listing in listings])
