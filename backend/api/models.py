from django.db import models

# Add More Status here
STATUS_TYPE = (
    ('All','ALL'),
    ('Done','DONE'),
    ('To-Do', 'TO DO'),
    ('In-Progress', 'IN PROGRESS'),    
)

# Create your models here.
class taskPost(models.Model):
    title = models.CharField(max_length=200,verbose_name='Title')
    description = models.TextField(verbose_name='Description')
    status = models.CharField(max_length=20,verbose_name='Status',choices=STATUS_TYPE, default='To-Do')

    class Meta:
        db_table = 'tbl_task'
        verbose_name = 'Task Details'
        unique_together = ["title", "description", "status"]

    def __str__(self):
        return self.title
