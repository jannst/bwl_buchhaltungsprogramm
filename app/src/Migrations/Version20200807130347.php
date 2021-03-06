<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200807130347 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE booking_operation (id INT AUTO_INCREMENT NOT NULL, soll_account_id INT NOT NULL, haben_account_id INT NOT NULL, date DATETIME NOT NULL, description VARCHAR(1024) DEFAULT NULL, INDEX IDX_8AB36D6E300DD4EF (soll_account_id), INDEX IDX_8AB36D6E71874467 (haben_account_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E300DD4EF FOREIGN KEY (soll_account_id) REFERENCES account (id)');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E71874467 FOREIGN KEY (haben_account_id) REFERENCES account (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE booking_operation');
    }
}
