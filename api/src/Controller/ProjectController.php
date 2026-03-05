<?php declare(strict_types=1);

namespace App\Controller;

use App\Service\ProjectService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ProjectController extends AbstractController
{
    public function __construct(
        private readonly ProjectService $projectService,
    ) {}

    #[Route('/projects', name: 'projects_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $projects = $this->projectService->listProjects();

        return $this->json([
            'data' => array_map(static fn ($p) => $p->toArray(), $projects),
        ]);
    }
}
