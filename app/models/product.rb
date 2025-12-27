class Product < ApplicationRecord
  has_many :scores, dependent: :destroy
  
  # Check these lines specifically:
  has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
  has_many :followees, through: :followed_users
  
  has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
  has_many :followers, through: :following_users
  
  has_many :passive_relationships, class_name: "Follow", 
                                   foreign_key: "followed_id", 
                                   dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :follower
end
