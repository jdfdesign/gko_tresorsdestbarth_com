class SectionColumnCountToInteger < ActiveRecord::Migration
  def self.up
    values = ['one', 'two', 'three', 'four', 'five']
    Preference.all.each do |p|
      if values.include?(p.value)
        if p.value == 'one'
          p.value = 1
        elsif p.value == 'two'
          p.value = 2
        elsif p.value == 'three'
          p.value = 3
        elsif p.value == 'four'
          p.value = 4
        elsif p.value == 'five'
          p.value = 5
        end
        p.save!
      end
    end
  end
end