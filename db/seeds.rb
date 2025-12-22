# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb

Product.create(idplay:'01', name: 'Player A', score: 1200, created_at: '2025-12-01', updated_at: '2025-12-02', last_update: '2025-12-05')
Product.create(idplay:'02', name: 'Player B', score: 799, created_at: '2025-12-01', updated_at: '2025-12-03', last_update: '2025-12-06')
Product.create(idplay:'03', name: 'Player C', score: 199, created_at: '2025-12-01', updated_at: '2025-12-04', last_update: '2025-12-07')
