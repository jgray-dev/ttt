import bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from utilities import db


# New
class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, value):
        self._password_hash = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt())

    def check_password(self, password):
        saved_bytes = self._password_hash.encode('utf-8')
        entered_bytes = password.encode('utf-8')
        return bcrypt.checkpw(entered_bytes, saved_bytes)



# OLD
# class Restaurant(db.Model, SerializerMixin):
#     __tablename__ = "restaurants"
# 
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     address = db.Column(db.String)
# 
#     # add relationship
#     restaurant_pizzas = relationship('RestaurantPizza', cascade='delete,all', back_populates='restaurant')
# 
#     # add serialization rules
#     serialize_rules = ('-restaurant_pizzas.restaurant',)
# 
#     def __repr__(self):
#         return f"<Restaurant {self.name}>"
# 
# 
# class Pizza(db.Model, SerializerMixin):
#     __tablename__ = "pizzas"
# 
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     ingredients = db.Column(db.String)
# 
#     # add relationship
#     restaurant_pizzas = relationship('RestaurantPizza', cascade='delete,all', back_populates='pizza')
# 
#     # add serialization rules
#     serialize_rules = ('-restaurant_pizzas.pizza',)
# 
#     def __repr__(self):
#         return f"<Pizza {self.name}, {self.ingredients}>"
# 
# 
# class RestaurantPizza(db.Model, SerializerMixin):
#     __tablename__ = "restaurant_pizzas"
# 
#     id = db.Column(db.Integer, primary_key=True)
#     price = db.Column(db.Integer, nullable=False)
# 
#     @validates('price')
#     def validate(self, key, value):
#         if value >= 1 and value <= 30:
#             return value
#         else:
#             raise ValueError("Invalid price")
# 
#     # add relationships
# 
#     restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
#     pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'))
# 
#     restaurant = relationship('Restaurant', back_populates="restaurant_pizzas")
#     pizza = relationship('Pizza', back_populates="restaurant_pizzas")
# 
#     # add serialization rules
#     serialize_rules = ('-pizza.restaurant_pizzas', '-restaurant.restaurant_pizzas')
# 
#     # add validation
# 
#     def __repr__(self):
#         return f"<RestaurantPizza ${self.price}>"
