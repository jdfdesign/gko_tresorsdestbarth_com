# WARN SPECIAL HTACCESS FOR LE TOINY : WE USE WWW


# bundler bootstrap
require 'bundler/capistrano'

##########################################
# capistrano
##########################################

# main details
set :hostname, '184.173.80.76' # account ip or domain
role :web, hostname
role :app, hostname
role :db,  hostname, :primary => true

# server details
set :domain, 'joufdesign.com' # hosting server name
set :keep_releases, 2
default_run_options[:pty] = true
ssh_options[:forward_agent] = true
set :use_sudo, false
set :group_writable, false
set :deploy_via, :remote_cache
set :password, 'ted(97133)' # account password
set :user, 'trsrsd' # account username
set :dbpassword, 'ted(97133)'# database user password
set :dbuser, 'trsrsd_db'# database user name
set :repository,  "git@github.com:jdfdesign/gko_tresorsdestbarth_com.git" #Github repository  
set :deploy_dir, "/home/#{user}/ror/staging" #deploy directory 
set :branch, 'master'
set :stage, 'production'
set :application, "#{stage}"
set :rails_env, "#{stage}"
set :deploy_to, "#{deploy_dir}/#{stage}"
set :scm, 'git'
set :scm_passphrase, "PASSWORD"
set :git_enable_submodules, 1 # if you have vendored rails
set :scm_verbose, true

set :copy_exclude, [".gitignore", ".git", ".cache", ".DS_Store", "config/deploy.rb", "Capfile", "config/deploy"]

#######################################################
after 'deploy:setup' do
  deploy.setup_shared_folder
  deploy.setup_database
  deploy.upload_private_files
end
after "deploy:update_code" do
  deploy.update_symlinks
  deploy.create_htaccess
  dragonfly.symlink
end
after "deploy:symlink" do
  #deploy.update_subdomains_symlink
  #deploy.update_crontab
end
#######################################################
#######################################################
# namespace :deploy
#######################################################
#######################################################
namespace :deploy do
  
  desc "Upload private files"
  task :upload_private_files, :roles => :app do
     top.upload("config/config.yml", "#{shared_path}/config/config.yml")
  end
  desc "Create default shared directories in shared_path"
  task :setup_shared_folder, :roles => :app do
     # the -p flag on mkdir makes intermediate directories (i.e. both /bin and /bin/history), 
     # and doesn't raise an error if any of the directories already exist.
     dirs = %w(config system uploads).map { |d| File.join(shared_path, d) }
     run "#{try_sudo} mkdir -p #{dirs.join(' ')} && #{try_sudo} chmod g+w #{dirs.join(' ')}"
  end
  
  desc "Création du fichier de configuration database.yml"
  task :setup_database do
    puts "\033[1;41m Création du fichier de configuration database.yml \033[0m"
    db_config = <<-EOF
    settings:  &settings
      adapter: mysql2
      encoding: utf8
      username: #{dbuser}
      password: #{dbpassword}
      database: #{user}_staging
      reconnect: false
      pool: 5
      
    #{rails_env}:
      <<: *settings
    
    # needed else app could not start properly  
    development:
      <<: *settings
    EOF
    put db_config, "#{shared_path}/config/database.yml"
  end
  
  task :update_symlinks, :except => { :no_release => true }, :roles => :app do 
    # -f argument replace the existing symlink automatically
    # -n argument replace the existing directory symlink automatically
    # If the existing symlink you're trying to replace points to a directory, 
    # the above actually creates a symlink inside the dereferenced directory 
    # the old symlink points to. (Or fails if the referent is invalid.)
    # Symlink the database configuration file
    #run "rm -rf #{release_path}/public/uploads"

    run "ln -nsf #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    run "ln -nsf #{shared_path}/config/config.yml #{release_path}/config/config.yml"
    run "ln -nsf #{shared_path}/system #{release_path}/public/system"
    run "ln -nsf #{shared_path}/uploads #{release_path}/public/uploads"
    run "chmod 755 #{release_path}/public"
    run "mv /home/#{user}/public_html /home/#{user}/public_html.moved"
    run "ln -nsf #{release_path}/public /home/#{user}/public_html" 
    run "rm -rf /home/#{user}/public_html/staging"
    run "ln -nsf #{release_path}/public /home/#{user}/public_html/staging"
  end

  desc <<-DESC
    Création du fichier htaccess pour Site5
  DESC
  task :create_htaccess do
    puts "\033[1;41m Création du fichier htaccess \033[0m"
    htaccess = <<-EOF   
      PassengerEnabled on
      PassengerAppRoot #{deploy_to}/current
      RailsEnv #{rails_env}

      RewriteEngine On


      #-Redirection www.domain.com => domain.com
      #RewriteCond %{HTTP_HOST} ^www.(.*)$ [NC]
      #RewriteRule ^(.*)$ http://%1/$1 [R=301,NC,L]
      
      #-Rewrite home to check for static 
      #RewriteRule ^$ home
      #-Checks cache directory for already cached pages 
    
      #RewriteCond %{REQUEST_URI} /(../)?[/]*$
      RewriteCond %{DOCUMENT_ROOT}/gko/cache/%{HTTP_HOST}%{REQUEST_URI}.html -f
      RewriteRule ^(.*)$ /gko/cache/%{HTTP_HOST}%{REQUEST_URI}.html [L]

      #-By default, Rails appends asset timestamps to all asset paths. This allows
      #-you to set a cache-expiration date for the asset far into the future 
      ExpiresActive on 
    
      ExpiresByType image/gif "access plus 1 year" 
      ExpiresByType image/png "access plus 1 year" 
      ExpiresByType image/jpeg "access plus 1 year" 
      ExpiresByType image/x-icon "access plus 1 year" 
      ExpiresByType text/css "access plus 1 year" 
      ExpiresByType application/javascript "access plus 1 year"
    
      #-compress static text files 
      AddOutputFilterByType DEFLATE text/html text/plain text/xml text/javascript text/css application/javascript
    EOF
    
    put htaccess, "#{current_release}/public/.htaccess"
  end

  desc <<-DESC
    Restarts your application. \
    Overwrites default :restart task for Passenger server.
  DESC
  task :restart, :roles => :app, :except => { :no_release => true } do
    puts "\033[1;41m Restart passenger \033[0m"
    passenger.restart
  end

  desc <<-DESC
    Starts the application servers. \
    Overwrites default :start task for Passenger server.
  DESC
  task :start, :roles => :app do
    puts "\033[1;41m Start passenger \033[0m"
    passenger.start
  end

  desc <<-DESC
    Stops the application servers. \
    Overwrites default :start task for Passenger server.
  DESC
  task :stop, :roles => :app do
    puts "\033[1;41m Stop passenger \033[0m"
    passenger.stop
  end
end

#####################################
# namespace :dragonfly
#####################################
namespace :dragonfly do
  desc "Symlink the Rack::Cache files"
  task :symlink, :roles => [:app] do
    run "mkdir -p #{shared_path}/tmp/dragonfly && ln -nfs #{shared_path}/tmp/dragonfly #{release_path}/tmp/dragonfly"
  end
end
#####################################
# namespace :passenger
#####################################
namespace :passenger do  
  desc <<-DESC
    Restarts your application. \
    This works by creating an empty `restart.txt` file in the `tmp` folder
    as requested by Passenger server.
  DESC
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{current_path}/tmp/restart.txt"
  end

  desc <<-DESC
    Starts the application servers. \
    Please note that this task is not supported by Passenger server.
  DESC
  task :start, :roles => :app do
    logger.info ":start task not supported by Passenger server"
  end

  desc <<-DESC
    Stops the application servers. \
    Please note that this task is not supported by Passenger server.
  DESC
  task :stop, :roles => :app do
    logger.info ":stop task not supported by Passenger server"
  end
end
