from app.models import db, Comment


def seed_comments():

    comment1 = Comment(user_id=1, listing_id=1, body="Wow...Wow. Wow... !! I resonate with this! Love the color choices too. Snaps and claps.")
    comment2 = Comment(user_id=2, listing_id=1, body="The kid's face.. LOL, the emotion pours through. Hes so happy and the hero is so willing! LOVE this.")



    db.session.add(comment1)
    db.session.add(comment2)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
