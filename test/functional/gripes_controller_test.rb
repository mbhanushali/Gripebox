require 'test_helper'

class GripesControllerTest < ActionController::TestCase
  setup do
    @gripe = gripes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gripes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create gripe" do
    assert_difference('Gripe.count') do
      post :create, gripe: @gripe.attributes
    end

    assert_redirected_to gripe_path(assigns(:gripe))
  end

  test "should show gripe" do
    get :show, id: @gripe.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @gripe.to_param
    assert_response :success
  end

  test "should update gripe" do
    put :update, id: @gripe.to_param, gripe: @gripe.attributes
    assert_redirected_to gripe_path(assigns(:gripe))
  end

  test "should destroy gripe" do
    assert_difference('Gripe.count', -1) do
      delete :destroy, id: @gripe.to_param
    end

    assert_redirected_to gripes_path
  end
end
