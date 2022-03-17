from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Listing, User, Comment,db

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['GET'])
@login_required
def listing_comments(id):
    comments = Comment.query.filter(Comment.listing_id == id).all()

    return jsonify([comment.to_dict() for comment in comments])
