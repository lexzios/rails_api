# app/controllers/api/v1/products_controller.rb

class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]
  skip_before_action :verify_authenticity_token
  
  def index
    @products = Product.all
    render json: @products # Renders all products as JSON
  end

  def show
    render json: @product
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product, status: :created # Returns 201 status on success
    else
      render json: @product.errors, status: :unprocessable_entity # Returns 422 status on error
    end
  end
  
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
    head :no_content # Returns a 204 status (no content) on successful deletion
  end

  private

  def set_product
    @product = Product.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Resource not found" }, status: :not_found # Returns 404 status
  end

  def product_params
    params.require(:product).permit(:name, :score, :idplay, :last_update, :following) # Strong parameters for security
  end
end
