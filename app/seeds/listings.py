from app.models import db, Listing


def seed_listings():

    listing1 = Listing(user_id=1, url="https://images.squarespace-cdn.com/content/v1/5955777415d5dbbfe714e59e/1565817473964-645KK5BVMKZVFNTPBH9J/ashcan-digital-hero-36-a01-1000h-2019-08.jpg?format=2500w", title="Aschan, Everyones Hero", description="I felt with this piece a small but important part of my childhood came to life in the moments creating this. This is my third digital piece and I am always open to constructive criticism. I used Sketch app, Microsoft Surface Pro with the pro pen.")
    listing2 = Listing(user_id=1, url="http://prod-upp-image-read.ft.com/e9a0d7ee-a1be-11e8-85da-eeb7a9ce36e4", title="The Outer Worlds", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing3 = Listing(user_id=1, url="https://maxcdn.icons8.com/app/uploads/2019/06/digital-illustration-brian-edward-miller-8.jpg", title="The climb and solution", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing4 = Listing(user_id=1, url="https://mir-s3-cdn-cf.behance.net/project_modules/1400/ab723877268563.5c829061bd6ea.jpg", title="What we Dreamed of..", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing5 = Listing(user_id=1, url="https://w0.peakpx.com/wallpaper/999/36/HD-wallpaper-women-brunette-artwork-painting-digital-painting-drawing-2d-digital-art-illustration-women-with-glasses-glasses-angel-ganev.jpg", title="Angel Ganev, Her", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing6 = Listing(user_id=1, url="https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NDQ1MDEzMTIyNjg4MzYw/digital-art-a-revolutionary-form-of-art.jpg", title="Deep dive to the Soul", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing7 = Listing(user_id=1, url="https://d11kvfv4kxw5s4.cloudfront.net/wp-content/uploads/sites/15/2021/05/31130410/squirtle-in-a-super-brand-1.jpg", title="Squirtle..give me my Vuitton Ball!", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing8 = Listing(user_id=1, url="https://www.homestratosphere.com/wp-content/uploads/2019/10/Example-of-computer-illustration-digital-art-oct16.jpg", title="Lost? or Found at Sea..", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing9 = Listing(user_id=1, url="https://cdn.mos.cms.futurecdn.net/RzYdh3iL3rNhBn8sKBKfdH.jpg", title="Rigth Before Your Eyes", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")
    listing10 = Listing(user_id=1, url="https://3udno63459u23yboa6366rls-wpengine.netdna-ssl.com/wp-content/uploads/2018/06/Mr.Xerty-Feature.jpg", title="We Are Powerful Beyond Measure", description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores")


    db.session.add(listing1)
    db.session.add(listing2)
    db.session.add(listing3)
    db.session.add(listing4)
    db.session.add(listing5)
    db.session.add(listing6)
    db.session.add(listing7)
    db.session.add(listing8)
    db.session.add(listing9)
    db.session.add(listing10)

    db.session.commit()


def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
