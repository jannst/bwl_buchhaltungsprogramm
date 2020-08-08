<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191206095808 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE pump_property (id INT AUTO_INCREMENT NOT NULL, pump_id INT NOT NULL, property_type VARCHAR(255) NOT NULL, property_value VARCHAR(255) NOT NULL, date_created DATETIME DEFAULT NULL, INDEX IDX_275BDF55B9769C65 (pump_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, date_created DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pump (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, date_manufactured DATETIME NOT NULL, date_next_inspection DATETIME DEFAULT NULL, INDEX IDX_9817B1ED166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE pump_property ADD CONSTRAINT FK_275BDF55B9769C65 FOREIGN KEY (pump_id) REFERENCES pump (id)');
        $this->addSql('ALTER TABLE pump ADD CONSTRAINT FK_9817B1ED166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pump DROP FOREIGN KEY FK_9817B1ED166D1F9C');
        $this->addSql('ALTER TABLE pump_property DROP FOREIGN KEY FK_275BDF55B9769C65');
        $this->addSql('DROP TABLE pump_property');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE pump');
    }
}
