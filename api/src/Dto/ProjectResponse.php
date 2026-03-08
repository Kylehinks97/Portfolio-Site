<?php declare(strict_types=1);

namespace App\Dto;

final class ProjectResponse
{
    public function __construct(
        public string  $title,
        public string  $descriptionEnglish,
        public string  $descriptionSpanish,
        public ?string  $thumbnailPath,
        public ?string $videoPath,
        public string  $createdAt,
        public int  $prideLevel,
        public ?string  $link,
        public bool $isPersonal,
        public ?string $repo
    ) {}

    /**
     * @return array{
     *   title: string,
     *   descriptionEnglish: string,
     *   descriptionSpanish: string,
     *   thumbnailPath: ?string,
     *   videoPath: ?string,
     *   createdAt: string,
     *   prideLevel: int,
     *   link: ?string,
     *   isPersonal: bool,
     *   repo: ?string
     * }
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'descriptionEnglish' => $this->descriptionEnglish,
            'descriptionSpanish' => $this->descriptionSpanish,
            'thumbnailPath' => $this->thumbnailPath,
            'videoPath' => $this->videoPath,
            'createdAt' => $this->createdAt,
            'prideLevel' => $this->prideLevel,
            'link' => $this->link,
            'isPersonal' => $this->isPersonal,
            'repo' => $this->repo,
        ];
    }
}
