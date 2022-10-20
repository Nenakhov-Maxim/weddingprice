"""new column in orders

Revision ID: 188c6cd2086c
Revises: c94a6383fa8d
Create Date: 2022-10-19 19:58:02.831926

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '188c6cd2086c'
down_revision = 'c94a6383fa8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('results_storage', sa.Boolean(), nullable=True))
    op.add_column('orders', sa.Column('transporting', sa.Boolean(), nullable=True))
    op.add_column('orders', sa.Column('publish', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'publish')
    op.drop_column('orders', 'transporting')
    op.drop_column('orders', 'results_storage')
    # ### end Alembic commands ###
