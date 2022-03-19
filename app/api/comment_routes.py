from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Listing, User, Comment,db

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['GET'])
@login_required
def listing_comments(id):
    comments = Comment.query.filter(Comment.listing_id == id).all()
    # commentUser = User.query.filter(User.id == Comment.user_id).first()
    # print("GKFLGKSDLGKSDFLGK", commentUser)

    return jsonify([comment.to_dict() for comment in comments])


@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    user_id = request.json['user_id']
    listing_id = request.json['listing_id']
    comment = request.json['body']

    newComment = Comment(
        user_id=user_id,
        listing_id=listing_id,
        body=comment
    )
    print("POST COMMENT API", newComment)
    db.session.add(newComment)
    db.session.commit()

    return jsonify(newComment.to_dict())


@comment_routes.route('/edit', methods=['PUT'])
@login_required
def edit_comment():
    # print("FROM PUT !", id)
    object = request.json
    print("FROM PUT !!", object)
    body = request.json["body"]
    commentId = request.json["commentId"]
    print("FROM PUT !!!", commentId)

    currComment = Comment.query.get(commentId)
    print("FROM EDIT API", currComment)
    currComment.body = body
    db.session.commit()

    return jsonify(currComment.to_dict())


@comment_routes.route('/delete', methods=['DELETE'])
@login_required
def delete_comment():
    commentId = request.json["commentId"]

    currComment = Comment.query.get(commentId)

    db.session.delete(currComment)
    db.session.commit()

    return currComment.to_dict()
