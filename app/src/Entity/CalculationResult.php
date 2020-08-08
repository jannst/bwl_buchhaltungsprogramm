<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(collectionOperations={}, itemOperations={
 *     "get"={
 *         "method"="GET",
 *         "path"="project_calculation/{id}",
 *         "controller"=\App\Controller\ExecuteProjectCalculation::class,
 *         "read"=false,
 *         "write"=false
 *     }
 * })
 */
class CalculationResult
{
    /**
     * @var integer
     * @ApiProperty(identifier=true)
     */
    public $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    public $calculatedMd5;

    /**
     * @ORM\Column(type="integer")
     */
    public $calculationTime;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getCalculatedMd5(): ?string
    {
        return $this->calculatedMd5;
    }

    public function setCalculatedMd5(string $calculatedMd5): self
    {
        $this->calculatedMd5 = $calculatedMd5;

        return $this;
    }

    public function getCalculationTime(): ?int
    {
        return $this->calculationTime;
    }

    public function setCalculationTime(int $calculationTime): self
    {
        $this->calculationTime = $calculationTime;

        return $this;
    }
}
