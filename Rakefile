#!/usr/bin/env rake

require 'yaml'

namespace :autopub do

  task :default do
    [
      'autopub:epub',
      'autopub:mobi',
    ].each {|sym| Rake::Task[sym.to_s].invoke }
  end

  task :epub => :metadata_xml do
    target_path = File.join(dist_dir, 'book.epub')
    command = <<-cmd
pandoc -o #{target_path} #{src_dir}/*.md                                       \
  --epub-cover-image=#{src_dir}/cover.jpg                                      \
  --epub-metadata=#{tmp_dir}/metadata.xml                                      \
  --toc                                                                        \
  --toc-depth=2                                                                \
  --epub-stylesheet=#{src_dir}/stylesheet.css
cmd
    system(command)
    puts "Successfully generated #{target_path}"
  end

  task :metadata_xml do
    config = YAML.load_file("#{src_dir}/config.yml")['book']
    metadata_xml_path = "#{tmp_dir}/metadata.xml"
    xml = <<-xml
<dc:title>#{config['title']}</dc:title>
<dc:language>#{config['language'] || 'en-US'}</dc:language>
<dc:creator opf:file-as="#{config['author']['file_as']}" opf:role="aut">#{config['author']['display_as']}</dc:creator>
<dc:publisher>#{config['publisher']}</dc:publisher>
<dc:date opf:event="publication">#{config['publication_date']}</dc:date>
<dc:rights>#{config['rights']}</dc:rights>
xml
    File.open(metadata_xml_path, 'w') {|f| f.write(xml) }
  end

  task :epubcheck do
    next unless system('which epubcheck > /dev/null')
    system("epubcheck #{dist_dir}/book.epub")
  end

  task :mobi => [ :epub, :epubcheck ] do
    source_path = File.join(dist_dir, 'book.epub')
    target_path = File.join(dist_dir, 'book.mobi')
    system("kindlegen #{source_path}")
    puts "Successfully generated #{target_path}"
  end

  def root_dir
    File.dirname(__FILE__)
  end

  def src_dir
    File.join(root_dir, 'src')
  end

  def dist_dir
    File.join(root_dir, 'dist')
  end

  def tmp_dir
    File.join(root_dir, 'tmp')
  end

end

task :default do
  Rake::Task['autopub:default'].invoke
end

