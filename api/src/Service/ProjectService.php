<?php declare(strict_types=1);

namespace App\Service;

use App\Dto\ProjectResponse;
use App\Entity\Project;
use App\Repository\ProjectRepository;

final readonly class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository,
    ) {}

    /**
     * @return list<ProjectResponse>
     */
    public function listProjects(): array
    {
        $projects = $this->projectRepository->findAllOrderedByCreatedAtDesc();

        return array_map(
            static fn (Project $project) => new ProjectResponse(
                title: $project->getTitle(),
                description: $project->getDescription(),
                thumbnailPath: $project->getThumbnailPath(),
                videoPath: $project->getVideoPath(),
                createdAt: $project->getCreatedAt()->format(\DateTimeInterface::ATOM),
                prideLevel: $project->getPrideLevel(),
                link: $project->getLink(),
            ),
            $projects,
        );
    }
}
