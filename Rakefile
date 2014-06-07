#!/usr/bin/env rake

namespace :autopub do

  task :default do
    [
      'autopub:epub',
      'autopub:mobi',
    ].each {|sym| Rake::Task[sym.to_s].invoke }
  end

  task :epub do
    command = <<-cmd
pandoc -o #{dist_dir}/book.epub #{src_dir}/*.md                                \
  --epub-cover-image=#{src_dir}/cover.jpg                                      \
  --epub-metadata=#{src_dir}/metadata.xml                                      \
  --toc                                                                        \
  --toc-depth=2                                                                \
  --epub-stylesheet=#{src_dir}/stylesheet.css
cmd
    exec(command)
  end

  task :epubcheck do
    next unless system('which epubcheck > /dev/null')
    exec("epubcheck #{dist_dir}/book.epub")
  end

  task :mobi => [ :epub, :epubcheck ] do
    exec("kindlegen #{dist_dir}/book.epub")
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

end

task :default do
  Rake::Task['autopub:default'].invoke
end

