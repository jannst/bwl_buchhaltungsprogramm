<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200810000157 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE operating_year (id INT AUTO_INCREMENT NOT NULL, year INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opening_balance CHANGE year year_id INT NOT NULL');
        $this->addSql('ALTER TABLE opening_balance ADD CONSTRAINT FK_989EB17E40C1FEA7 FOREIGN KEY (year_id) REFERENCES operating_year (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_989EB17E40C1FEA7 ON opening_balance (year_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE opening_balance DROP FOREIGN KEY FK_989EB17E40C1FEA7');
        $this->addSql('DROP TABLE operating_year');
        $this->addSql('DROP INDEX UNIQ_989EB17E40C1FEA7 ON opening_balance');
        $this->addSql('ALTER TABLE opening_balance CHANGE year_id year INT NOT NULL');
    }
}
