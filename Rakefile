#!/usr/bin/env rake

require 'yaml'

namespace :autopub do

  task :default do
    [
      'autopub:pdf',
      'autopub:epub',
      'autopub:mobi',
    ].each {|sym| Rake::Task[sym.to_s].invoke }
  end

  task :pdf do
    unless system('which latex > /dev/null')
      puts "WARNING: Skipping pdf generation because MacTex is not installed. Get it here: http://tug.org/mactex/"
      next
    end

    target_path = "#{dist_dir}/book.pdf"
    ok = system "pandoc --smart #{src_dir}/*.md -o #{target_path}"
    if ok
      puts "Successfully generated #{target_path}"
    else
      raise 'Error generating pdf file.'
    end
    $?
  end

  task :epub => :metadata_xml do
    target_path = File.join(dist_dir, 'book.epub')
    command = <<-cmd
pandoc --smart                                                                 \
  #{src_dir}/*.md                                                              \
  -o #{target_path}                                                            \
  --self-contained                                                             \
  --epub-cover-image=#{src_dir}/cover.jpg                                      \
  --epub-metadata=#{tmp_dir}/metadata.xml                                      \
  --toc                                                                        \
  --toc-depth=2                                                                \
  --epub-embed-font=#{lib_dir}/fonts/Inconsolata.otf                           \
  --epub-embed-font=#{lib_dir}/fonts/MgOpenModataRegular.ttf                   \
  --epub-embed-font=#{lib_dir}/fonts/invisible1.ttf                            \
  --epub-stylesheet=#{src_dir}/styles.css
cmd
    ok = system(command)
    if ok
      puts "Successfully generated #{target_path}"
    else
      raise 'Error generating epub file.'
    end
    $?
  end

  task :metadata_xml do
    metadata = YAML.load_file("#{src_dir}/metadata.yml")['book']
    metadata_xml_path = "#{tmp_dir}/metadata.xml"
    xml = <<-xml
<dc:title>#{metadata['title']}</dc:title>
<dc:language>#{metadata['language'] || 'en-US'}</dc:language>
<dc:creator opf:file-as="#{metadata['author']['file_as']}" opf:role="aut">#{metadata['author']['display_as']}</dc:creator>
<dc:publisher>#{metadata['publisher']}</dc:publisher>
<dc:date opf:event="publication">#{metadata['publication_date']}</dc:date>
<dc:rights>#{metadata['rights']}</dc:rights>
xml
    File.open(metadata_xml_path, 'w') {|f| f.write(xml) }
  end

  task :epubcheck do
    next unless system('which epubcheck > /dev/null')
    ok = system("epubcheck #{dist_dir}/book.epub")
    raise 'Error validating generated epub file.' unless ok
    $?
  end

  task :mobi => [ :epub, :epubcheck ] do
    source_path = File.join(dist_dir, 'book.epub')
    target_path = File.join(dist_dir, 'book.mobi')
    ok = system("kindlegen #{source_path}")
    if ok
      puts "Successfully generated #{target_path}"
    else
      # NOTE: kindlegen fails if there are warnings (even if the mobi file is
      # generated). Don't raise an exception here.
    end
    $?
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

  def lib_dir
    File.join(root_dir, 'lib')
  end

end

task :default do
  Rake::Task['autopub:default'].invoke
end

