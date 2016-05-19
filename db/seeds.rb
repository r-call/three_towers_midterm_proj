seed_file = Rails.root.join('db', 'seeds', 'categories.yml')
config = YAML::load_file(seed_file)
Category.create!(config)
