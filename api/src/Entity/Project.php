<?php declare(strict_types=1);

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    private Uuid $id;

    #[ORM\Column(type: Types::TEXT)]
    private string $title;

    #[ORM\Column(type: Types::TEXT)]
    private string $descriptionEnglish;

    #[ORM\Column(type: Types::TEXT)]
    private string $descriptionSpanish;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $thumbnailPath = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $videoPath = null;

    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: Types::INTEGER)]
    private int $prideLevel;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $link = null;

    #[ORM\Column]
    private bool $isPersonal;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $repo = null;

    public function __construct()
    {
        $this->id = Uuid::v7();
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescriptionEnglish(): string
    {
        return $this->descriptionEnglish;
    }

    public function setDescriptionEnglish(string $description): static
    {
        $this->descriptionEnglish = $description;

        return $this;
    }

    public function getDescriptionSpanish(): string
    {
        return $this->descriptionSpanish;
    }

    public function setDescriptionSpanish(string $description): static
    {
        $this->descriptionSpanish = $description;

        return $this;
    }

    public function getThumbnailPath(): ?string
    {
        return $this->thumbnailPath;
    }

    public function setThumbnailPath(?string $thumbnailPath): static
    {
        $this->thumbnailPath = $thumbnailPath;

        return $this;
    }

    public function getVideoPath(): ?string
    {
        return $this->videoPath;
    }

    public function setVideoPath(?string $videoPath): static
    {
        $this->videoPath = $videoPath;

        return $this;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getPrideLevel(): int
    {
        return $this->prideLevel;
    }

    public function setPrideLevel(int $prideLevel): static
    {
        $this->prideLevel = $prideLevel;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): static
    {
        $this->link = $link;

        return $this;
    }

    public function isPersonal(): bool
    {
        return $this->isPersonal;
    }

    public function setIsPersonal(bool $isPersonal): static
    {
        $this->isPersonal = $isPersonal;

        return $this;
    }

    public function getRepo(): ?string
    {
        return $this->repo;
    }

    public function setRepo(?string $hasRepo): void
    {
        $this->repo = $hasRepo;
    }
}
