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
 *         "path"="running_number/{id}",
 *         "controller"=\App\Controller\NewBiggestRunningNumber::class,
 *         "read"=false,
 *         "write"=false
 *     }
 * })
 */
class RunningNumber
{
    /**
     * @var integer
     * @ApiProperty(identifier=true)
     */
    public $id;

    /**
     * @ORM\Column(type="integer")
     */
    public $runningNumber;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getRunningNumber()
    {
        return $this->runningNumber;
    }

    /**
     * @param mixed $runningNumber
     */
    public function setRunningNumber($runningNumber): void
    {
        $this->runningNumber = $runningNumber;
    }
}