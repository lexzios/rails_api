# app/controllers/api/v1/follows_controller.rb
module Api
  module V1
    class FollowsController < ApplicationController
    #   before_action :set_follow, only: [:create, :update, :destroy]
    skip_before_action :verify_authenticity_token
      def show
        product = Product.find(params[:id])
        
        # 2. Get the followers (which are also Products in your setup)
        followers = product.followers
        
        # 3. Return the data
        render json: {
          product_id: product.id,
          product_name: product.name,
          followers_count: followers.count,
          followers: followers.as_json(only: [:id, :name, :high_score])
        }, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
      end

      # GET /api/v1/follow (Optional: List all follows for the current user)
      def index
        render json: current_user.following, status: :ok
      end

      def create
        # Use params[:current_user_id] passed from JS for this demo
        follower = Product.find(params[:id])
        followed = Product.find(params[:id])
        
        follow = Follow.new(follower: follower, followed: followed)
        if follow.save
          render json: { status: 'success', message: "Following #{follower.name}" }
        else
          render json: { status: 'error', message: follow.errors.full_messages }, status: 422
        end
      end

      def destroy
        follow = Follow.find_by(follower_id: params[:id], followed_id: params[:id])
        if follow&.destroy
          render json: { status: 'success', message: 'Unfollowed' }
        else
          render json: { status: 'error', message: 'Not found' }, status: 404
        end
      end
    end
  end
end