<?php declare(strict_types=1);

namespace App\Command;

use Doctrine\DBAL\Connection;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(name: 'app:seed-projects', description: 'Seed the project table with built-in project data')]
final class SeedProjectsCommand extends Command
{
    public function __construct(
        private readonly Connection $connection,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $projects = [
            [
                'id' => 'a0b16b7a-c7c3-4d70-a027-e92a50f42c42',
                'description' => 'Mesure',
                'title' => 'Mesure',
                'thumbnail_path' => null,
                'video_path' => 'mesure_demo.mp4',
                'created_at' => '2026-03-07 20:59:03',
                'pride_level' => 1,
                'link' => null,
                'is_personal' => true,
                'repo' => 'https://github.com/Kylehinks97/mesure',
            ],
            [
                'id' => '8506aa72-b19d-4f2d-8b8e-76d6e5d78ad9',
                'description' => 'Custodio Digital',
                'title' => 'Custodio Digital',
                'thumbnail_path' => 'custodio.png',
                'video_path' => null,
                'created_at' => '2026-03-07 20:58:02',
                'pride_level' => 3,
                'link' => 'https://custodio.digital/es',
                'is_personal' => false,
                'repo' => null,
            ],
            [
                'id' => 'b7a0b85c-0354-48b0-94d3-8b1eb5195e05',
                'description' => 'Club Swap',
                'title' => 'Club Swap',
                'thumbnail_path' => 'club-swap.png',
                'video_path' => null,
                'created_at' => '2026-03-07 20:59:22',
                'pride_level' => 4,
                'link' => 'https://clubswap-9ac6f983a2f6.herokuapp.com/',
                'is_personal' => true,
                'repo' => null,
            ],
            [
                'id' => 'b7e06dd9-0b75-4915-9a06-17b3cce6cdc4',
                'description' => 'Conjugator',
                'title' => 'Conjugator',
                'thumbnail_path' => 'conjugator.png',
                'video_path' => null,
                'created_at' => '2026-03-07 23:22:04',
                'pride_level' => 3,
                'link' => 'https://kyle-hinks-conjugator.netlify.app/',
                'is_personal' => true,
                'repo' => null,
            ],
        ];
        $rowsProcessed = 0;

        $this->connection->beginTransaction();

        try {
            foreach ($projects as $project) {
                $this->connection->executeStatement(
                    <<<'SQL'
                    INSERT INTO project (
                        id,
                        description,
                        title,
                        thumbnail_path,
                        video_path,
                        created_at,
                        pride_level,
                        link,
                        is_personal,
                        repo
                    ) VALUES (
                        :id,
                        :description,
                        :title,
                        :thumbnail_path,
                        :video_path,
                        :created_at,
                        :pride_level,
                        :link,
                        :is_personal,
                        :repo
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        description = EXCLUDED.description,
                        title = EXCLUDED.title,
                        thumbnail_path = EXCLUDED.thumbnail_path,
                        video_path = EXCLUDED.video_path,
                        created_at = EXCLUDED.created_at,
                        pride_level = EXCLUDED.pride_level,
                        link = EXCLUDED.link,
                        is_personal = EXCLUDED.is_personal,
                        repo = EXCLUDED.repo
                    SQL,
                    [
                        'id' => $project['id'],
                        'description' => $project['description'],
                        'title' => $project['title'],
                        'thumbnail_path' => $project['thumbnail_path'],
                        'video_path' => $project['video_path'],
                        'created_at' => $project['created_at'],
                        'pride_level' => $project['pride_level'],
                        'link' => $project['link'],
                        'is_personal' => $project['is_personal'] ? 'true' : 'false',
                        'repo' => $project['repo'],
                    ],
                );

                ++$rowsProcessed;
            }
            $this->connection->commit();
        } catch (\Throwable $exception) {
            $this->connection->rollBack();

            $io->error($exception->getMessage());

            return Command::FAILURE;
        }

        $io->success(sprintf('Seeded %d project row(s).', $rowsProcessed));

        return Command::SUCCESS;
    }
}
