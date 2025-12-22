class ScoresController < ApplicationController
  # GET /leaderboard
  def leaderboard
    @top_scores = User.order(score: :desc).limit(10)
    render json: @top_scores
  end

  # POST /scores
  def create
    @user = User.find_or_initialize_by(name: params[:name])
    @user.score = params[:score]
    @user.photo = params[:photo] if params[:photo]
    
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # POST /follow
  def follow
    follower = User.find(params[:follower_id])
    followed = User.find(params[:followed_id])
    follower.following << followed
    render json: { message: "Following successful" }
  end
end