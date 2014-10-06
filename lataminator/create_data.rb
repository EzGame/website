require 'json'

def rand_price
  range = Random.rand(4) + 1
  price = Random.rand( 25 ) + range * 25
  price/1.0 - 0.01
end


data_dir = ARGV[0]
file_dir = (ARGV[1]) ? ARGV[1] : "data.js"
data_array = []

Dir.entries(data_dir).each_with_index do |filename|
  if filename =~ /jpg|png|jpeg/
    hash = {}
    hash["img"] = "#{data_dir.gsub(/\//,"")}/#{filename}"
    hash["price"] = rand_price
    data_array << hash.to_json
  end
end

file = File.new(file_dir, "w")
file.write("window[\'items\'] = #{data_array};\n")
file.write("window[\'status\'] = \'SUCCESS\';")