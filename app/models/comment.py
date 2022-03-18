from .db import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id", ondelete='CASCADE'), nullable=False)
    body = db.Column(db.Text, nullable=False)

    user_info = db.relationship("User", back_populates="comment_info")
    listing_info = db.relationship("Listing", back_populates="comment_info")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "listing_id": self.listing_id,
            "body": self.body,
            "username": self.user_info.username
        }
