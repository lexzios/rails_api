class Follow < ApplicationRecord
       # Following logic
  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :followeds, class_name: :followed_users
  
  has_many :following_users, foreign_key: :followed_id, class_name: 'Follow'
  has_many :followers, through: :following_users

  # Ensure high scores are non-negative
  # validates :high_score, numericality: { greater_than_or_equal_to: 0 }
  # These must match the foreign_keys used in User.rb
  belongs_to :follower, class_name: 'Product'
  belongs_to :followed, class_name: 'Product'
end
