#!/usr/bin/python3
"""3-hbnb.py"""
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template
import uuid


app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """close session sqlalchemist"""
    storage.close()


@app.route('/3-hbnb/')
def hbnb_filters(the_id=None):
    """replace the existing route to /3-hbnb/"""
    stateObjs = storage.all('State').values()
    allState = dict([st.name, st] for st in stateObjs)
    allAmen = storage.all('Amenity').values()
    allPlace = storage.all('Place').values()
    allUser = dict([User.id, "{} {}".format(User.first_name, User.last_name)]
                   for User in storage.all('User').values())
    cache_id = (str(uuid.uuid4()))
    return render_template('3-hbnb.html', states=allState, amenities=allAmen,
                           places=allPlace, users=allUser, cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
