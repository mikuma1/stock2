class RenameCompanyNameToNameInCompanies < ActiveRecord::Migration[7.0]
  def change
    rename_column :companies, :company_name, :name
  end
end
