require 'yaml'
require_relative '../app/models/card'

cards = YAML::load_file('./db/seeds/cards.yml')
cards.each do |card|
  Card.create!(card)
end
