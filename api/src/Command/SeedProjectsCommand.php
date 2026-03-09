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
                'description_english' => 'Mesure is a passion project that asks whether there is a better way to estimate building materials. If you are a carpet or tile fitter, a plasterer, or a painter, estimating how many tubs of paint or packs of tiles you need is a common pain point because it is easy to over-order or under-order. This app lets you film the rooms you will be working in and automatically estimate wall dimensions to within about 5% accuracy. I trained a YOLOv8 model on COCO-annotated images to detect walls and derive measurements from each frame of a video. I used CVAT to create the training data.',
                'description_spanish' => 'Mesure es un proyecto personal que se pregunta si existe una mejor forma de calcular materiales de construccion. Si eres instalador de moqueta o azulejos, yesero o pintor, estimar cuantos botes de pintura o paquetes de azulejos necesitas suele ser un problema porque es facil pedir de mas o de menos. Esta aplicacion te permite grabar las habitaciones en las que vas a trabajar y estimar automaticamente las dimensiones de las paredes con una precision aproximada del 5%. Entrene un modelo YOLOv8 con imagenes anotadas en COCO para detectar paredes y obtener medidas a partir de cada fotograma del video. Use CVAT para crear los datos de entrenamiento.',
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
                'description_english' => 'Custodio Digital is a crypto-asset storage app I worked on during my time at Aircury. I was involved in backend architecture, frontend design, and feature implementation.',
                'description_spanish' => 'Custodio Digital es una aplicacion de almacenamiento de criptoactivos en la que trabaje durante mi etapa en Aircury. Participe en la arquitectura del backend, el diseno del frontend y la implementacion de funcionalidades.',
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
                'description_english' => 'Laravel platform for sharing golf clubs. With basic authentication, messaging and listing search and creation. As well as profile image and listing image support. Uses Firebase and MySQL. Made over 3 years ago when I was first learning PHP.',
                'description_spanish' => 'Plataforma en Laravel para compartir palos de golf. Incluye autenticacion basica, mensajeria, busqueda y creacion de anuncios, ademas de soporte para imagenes de perfil y de anuncios. Usa Firebase y MySQL. La hice hace mas de 3 anos, cuando estaba empezando a aprender PHP.',
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
                'description_english' => 'Conjugator is a Duolingo-inspired lesson generator. When learning how to conjugate Spanish verbs, I got the idea of an app that specifically trains this, in all or a selected tense. To tailor this language learning pain-point. The frontend still works, but no data arrives since I don\'t want to pay for the DB to be hosted. Made over 3 years ago when I put my mind to learning React.',
                'description_spanish' => 'Conjugator es un generador de lecciones inspirado en Duolingo. Mientras aprendia a conjugar verbos en espanol, se me ocurrio crear una aplicacion centrada especificamente en practicar esto, en todos los tiempos o en uno seleccionado, para resolver mejor ese problema de aprendizaje. El frontend sigue funcionando, pero ya no llegan datos porque no quiero seguir pagando el hosting de la base de datos. La hice hace mas de 3 anos, cuando me propuse aprender React en serio.',
                'title' => 'Conjugator',
                'thumbnail_path' => 'conjugator.png',
                'video_path' => null,
                'created_at' => '2026-03-07 23:22:04',
                'pride_level' => 3,
                'link' => 'https://kyle-hinks-conjugator.netlify.app/',
                'is_personal' => true,
                'repo' => null,
            ],
            [
                'id' => '21c5805a-2f1b-4055-bd56-a2793716ed27',
                'description_english' => 'One of four CEC projects. It is a project of the Department of Education in the UK. This one specifically stored education initiatives and the data involved. Involved a massive and complex data tree and RBAC. It was by far the most challenging professional project I have worked with due to sensitive data concerns. Used React, Symfony and PostrgeSQL.',
                'description_spanish' => 'Uno de cuatro proyectos de CEC. Es un proyecto del Department for Education del Reino Unido. Este en concreto almacenaba iniciativas educativas y los datos relacionados. Incluia un arbol de datos enorme y complejo, ademas de RBAC. Fue, con diferencia, el proyecto profesional mas desafiante en el que he trabajado debido a la sensibilidad de los datos. Use React, Symfony y PostgreSQL.',
                'title' => 'EANR (Enterprise Adviser Network Register)',
                'thumbnail_path' => 'eanr.png',
                'video_path' => null,
                'created_at' => '2026-03-08 18:32:04',
                'pride_level' => 2,
                'link' => 'https://auth.careersandenterprise.co.uk/eanr',
                'is_personal' => false,
                'repo' => null,
            ],
            [
                'id' => '7e6d8dd8-71f4-4c93-9d11-2d534d60267c',
                'description_english' => 'One of four CEC projects. It is a project of the Department of Education in the UK. This site is huge, detailing many initiatives and partnerships. I mainly handled the Playwright testing for this project. Ensuring all features work using a crawler and custom reporter classes to generate visualisations of working and broken elements in Google Sheets, uploaded to an S3 for QA to analyse.',
                'description_spanish' => 'Uno de cuatro proyectos de CEC. Es un proyecto del Department for Education del Reino Unido. Este sitio es muy grande y detalla numerosas iniciativas y colaboraciones. Yo me encargue principalmente de las pruebas con Playwright para este proyecto, asegurando que todas las funcionalidades funcionaran mediante un crawler y clases reporteras personalizadas para generar visualizaciones de elementos correctos y rotos en Google Sheets, subidas a S3 para que QA pudiera analizarlas.',
                'title' => 'Careers and Enterprise',
                'thumbnail_path' => 'cec.png',
                'video_path' => null,
                'created_at' => '2026-03-08 18:36:04',
                'pride_level' => 2,
                'link' => 'https://www.careersandenterprise.co.uk/',
                'is_personal' => false,
                'repo' => null,
            ],
            [
                'id' => '2df863f0-f18a-4b98-bf99-b1205e540e43',
                'description_english' => 'One of four CEC projects. It is a project of the Department of Education in the UK. This site stores resources for the education sector to search for and download. I mainly handled the Playwright testing for this project. Ensuring all features work using a crawler and custom reporter classes to generate visualisations of working and broken elements in Google Sheets, uploaded to an S3 for QA to analyse.',
                'description_spanish' => 'Uno de cuatro proyectos de CEC. Es un proyecto del Department for Education del Reino Unido. Este sitio almacena recursos para que el sector educativo pueda buscarlos y descargarlos. Yo me encargue principalmente de las pruebas con Playwright para este proyecto, asegurando que todas las funcionalidades funcionaran mediante un crawler y clases reporteras personalizadas para generar visualizaciones de elementos correctos y rotos en Google Sheets, subidas a S3 para que QA pudiera analizarlas.',
                'title' => 'CEC Resources',
                'thumbnail_path' => 'resources.png',
                'video_path' => null,
                'created_at' => '2026-03-08 18:37:04',
                'pride_level' => 2,
                'link' => 'https://resources.careersandenterprise.co.uk/',
                'is_personal' => false,
                'repo' => null,
            ],
            [
                'id' => '45b669df-c265-4fc6-ab73-24a2a91d29d6',
                'description_english' => 'One of four CEC projects. It is a project of the Department of Education in the UK. This site focuses on initiatives for primary schools. I mainly handled the Playwright testing for this project. Ensuring all features work using a crawler and custom reporter classes to generate visualisations of working and broken elements in Google Sheets, uploaded to an S3 for QA to analyse.',
                'description_spanish' => 'Uno de cuatro proyectos de CEC. Es un proyecto del Department for Education del Reino Unido. Este sitio se centra en iniciativas para escuelas primarias. Yo me encargue principalmente de las pruebas con Playwright para este proyecto, asegurando que todas las funcionalidades funcionaran mediante un crawler y clases reporteras personalizadas para generar visualizaciones de elementos correctos y rotos en Google Sheets, subidas a S3 para que QA pudiera analizarlas.',
                'title' => 'CEC Primary',
                'thumbnail_path' => 'primary.png',
                'video_path' => null,
                'created_at' => '2026-03-08 18:38:04',
                'pride_level' => 2,
                'link' => 'https://primaryplatform.careersandenterprise.co.uk/',
                'is_personal' => false,
                'repo' => null,
            ],
            [
                'id' => '6882959c-4ff6-4a2d-bfaf-ad5887e01644',
                'description_english' => 'Secure family video storage in Cloudflare Bucket, using Cloudflare pages and a worker. With authentication, image and video storage and sharing and search. To store family videos, especially important in JUne when my daughter is born.',
                'description_spanish' => 'Almacenamiento seguro de videos familiares en un Bucket de Cloudflare, utilizando Cloudflare Pages y un worker. Incluye autenticación, almacenamiento y compartición de imágenes y videos, además de búsqueda. Pensado para guardar videos familiares, especialmente importante en junio cuando nazca mi hija.',
                'title' => 'Hinks Family Videos',
                'thumbnail_path' => 'family-videos.png',
                'video_path' => null,
                'created_at' => '2025-03-09 08:50:04',
                'pride_level' => 2,
                'link' => 'https://family-videos-2cs.pages.dev/',
                'is_personal' => true,
                'repo' => null,
            ],
            [
                'id' => '3b0f28a0-a30f-43d3-9f2e-255b004f67b1',
                'title' => 'Portfolio Site',
                'description_english' => 'The site you are on right now. NextJS frontend fetching projects from a Symfony API. Code is public to view',
                'description_spanish' => 'El sitio en el que estás ahora mismo. Frontend en NextJS que obtiene proyectos desde una API en Symfony. El código es público para ver.',
                'thumbnail_path' => 'portfolio.png',
                'video_path' => null,
                'created_at' => '2025-03-08 08:50:04',
                'pride_level' => 2,
                'link' => null,
                'is_personal' => true,
                'repo' => 'https://github.com/Kylehinks97/Portfolio-Site',
            ]
        ];
        $rowsProcessed = 0;

        $this->connection->beginTransaction();

        try {
            foreach ($projects as $project) {
                $this->connection->executeStatement(
                    <<<'SQL'
                    INSERT INTO project (
                        id,
                        description_english,
                        description_spanish,
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
                        :description_english,
                        :description_spanish,
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
                        description_english = EXCLUDED.description_english,
                        description_spanish = EXCLUDED.description_spanish,
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
                        'description_english' => $project['description_english'],
                        'description_spanish' => $project['description_spanish'],
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
