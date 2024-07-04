from django.db import models
from cabin_site.models.user import User

class Cabin(models.Model):
    state = models.CharField(max_length=2)
    city = models.CharField()
    things_to_do = models.TextField()
    listing_url = models.URLField()
    image_url = models.URLField(blank=True)
    votes = models.ManyToManyField(User, related_name="votes", blank=True)