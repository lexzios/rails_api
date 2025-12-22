class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.string :idplay
      t.string :name
      t.string :following
      t.decimal :score
      t.date :last_update

      t.timestamps
    end
  end
end
