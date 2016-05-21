# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160521224736) do

  create_table "cards", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "image_url"
    t.string   "card_type"
    t.integer  "own_mana"
    t.integer  "own_gold"
    t.integer  "own_stamina"
    t.integer  "own_shield"
    t.integer  "own_castle"
    t.integer  "opp_mana"
    t.integer  "opp_gold"
    t.integer  "opp_stamina"
    t.integer  "opp_shield"
    t.integer  "opp_castle"
    t.integer  "mana_cost"
    t.integer  "gold_cost"
    t.integer  "stamina_cost"
    t.integer  "own_mana_rate"
    t.integer  "own_gold_rate"
    t.integer  "own_stamina_rate"
    t.integer  "opp_mana_rate"
    t.integer  "opp_gold_rate"
    t.integer  "opp_stamina_rate"
    t.string   "attr_swap"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", force: :cascade do |t|
    t.integer  "player_1_id"
    t.integer  "player_2_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "last_turn_player_id"
    t.integer  "winner_id"
  end

  create_table "held_cards", force: :cascade do |t|
    t.integer  "card_id"
    t.integer  "player_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "game_id"
  end

  add_index "held_cards", ["game_id"], name: "index_held_cards_on_game_id"

  create_table "players", force: :cascade do |t|
    t.integer  "castle",             default: 100
    t.integer  "shield",             default: 25
    t.integer  "stamina",            default: 10
    t.integer  "mana",               default: 10
    t.integer  "gold",               default: 10
    t.integer  "stamina_regen_rate", default: 3
    t.integer  "mana_regen_rate",    default: 3
    t.integer  "gold_regen_rate",    default: 3
    t.string   "last_card_played"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
