<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200822125800 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pump DROP FOREIGN KEY FK_9817B1ED166D1F9C');
        $this->addSql('ALTER TABLE pump_property DROP FOREIGN KEY FK_275BDF55B9769C65');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE pump');
        $this->addSql('DROP TABLE pump_property');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, date_created DATETIME NOT NULL, date_updated DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE pump (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, date_manufactured DATETIME NOT NULL, date_next_inspection DATETIME DEFAULT NULL, date_updated DATETIME DEFAULT NULL, INDEX IDX_9817B1ED166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE pump_property (id INT AUTO_INCREMENT NOT NULL, pump_id INT NOT NULL, property_type VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, property_value VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, date_created DATETIME NOT NULL, INDEX IDX_275BDF55B9769C65 (pump_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE pump ADD CONSTRAINT FK_9817B1ED166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE pump_property ADD CONSTRAINT FK_275BDF55B9769C65 FOREIGN KEY (pump_id) REFERENCES pump (id)');
    }
}
