"""added all tables. hopefully added relationships

Revision ID: dc193937e082
Revises: 6f5a06474806
Create Date: 2024-05-02 16:02:50.366227

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc193937e082'
down_revision = '6f5a06474806'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('content', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('time_created', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('thread_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_posts_author_id_users'), 'users', ['author_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_posts_thread_id_threads'), 'threads', ['thread_id'], ['id'])

    with op.batch_alter_table('threads', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('title', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('content', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('time_created', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('threads', schema=None) as batch_op:
        batch_op.drop_column('time_created')
        batch_op.drop_column('content')
        batch_op.drop_column('title')
        batch_op.drop_column('author_id')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_posts_thread_id_threads'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_posts_author_id_users'), type_='foreignkey')
        batch_op.drop_column('author_id')
        batch_op.drop_column('thread_id')
        batch_op.drop_column('time_created')
        batch_op.drop_column('content')

    # ### end Alembic commands ###
