<?php

namespace App\Controller;


use App\Entity\CalculationResult;
use App\Entity\Project;
use App\Service\ProductHashGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ExecuteProjectCalculation extends AbstractController
{

    private $entityManager;

    /**
     * @var ProductHashGenerator
     */
    private $productHashGenerator;

    public function __construct(EntityManagerInterface $entityManager, ProductHashGenerator $productHashGenerator)
    {
        $this->productHashGenerator = $productHashGenerator;
        $this->entityManager = $entityManager;
    }

    public function __invoke($id): CalculationResult
    {
        $microTimeStart = microtime();
        $productRepository = $this->entityManager->getRepository(Project::class);
        /**
         * @var $project Project
         */
        $project = $productRepository->find($id);
        if(!$project) {
            throw new EntityNotFoundException("could not find product with id $id");
        }

        $microTimeEnd = microtime();
        $timeUsed = (int)$microTimeEnd - (int)$microTimeStart;


        $data = new CalculationResult();
        $data->setCalculatedMd5($this->productHashGenerator->generateProductMd5($project));
        $data->setId($id);
        $data->setCalculationTime($timeUsed);

        return $data;
    }
}
