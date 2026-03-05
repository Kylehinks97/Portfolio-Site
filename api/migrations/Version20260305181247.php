<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260305181247 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add Project table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
        CREATE TABLE project (
            id UUID NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            thumbnail_path TEXT DEFAULT NULL,
            video_path TEXT DEFAULT NULL,
            created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
            pride_level INT NOT NULL,
            PRIMARY KEY (id)
        )
        SQL);
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE project');
    }
}
