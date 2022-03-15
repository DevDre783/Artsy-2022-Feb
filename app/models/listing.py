from .db import db


class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(125), nullable=False)
    description = db.Column(db.Text, nullable=False)

    comment_info = db.relationship("Comment", back_populates="listing_info")
    user_info = db.relationship("User", back_populates="listing_info")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "url": self.url,
            "description": self.description
        }
