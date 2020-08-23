<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200822130601 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE booking_operation DROP FOREIGN KEY FK_8AB36D6E300DD4EF');
        $this->addSql('ALTER TABLE booking_operation DROP FOREIGN KEY FK_8AB36D6E71874467');
        $this->addSql('ALTER TABLE booking_operation CHANGE soll_account_id soll_account_id INT DEFAULT NULL, CHANGE haben_account_id haben_account_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E300DD4EF FOREIGN KEY (soll_account_id) REFERENCES account (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E71874467 FOREIGN KEY (haben_account_id) REFERENCES account (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE booking_operation DROP FOREIGN KEY FK_8AB36D6E300DD4EF');
        $this->addSql('ALTER TABLE booking_operation DROP FOREIGN KEY FK_8AB36D6E71874467');
        $this->addSql('ALTER TABLE booking_operation CHANGE soll_account_id soll_account_id INT NOT NULL, CHANGE haben_account_id haben_account_id INT NOT NULL');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E300DD4EF FOREIGN KEY (soll_account_id) REFERENCES account (id)');
        $this->addSql('ALTER TABLE booking_operation ADD CONSTRAINT FK_8AB36D6E71874467 FOREIGN KEY (haben_account_id) REFERENCES account (id)');
    }
}
