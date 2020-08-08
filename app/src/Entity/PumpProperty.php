<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PumpPropertyRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class PumpProperty
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255)
     */
    private $propertyType;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255)
     */
    private $propertyValue;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $dateCreated;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pump", inversedBy="pumpProperties")
     * @ORM\JoinColumn(nullable=false)
     */
    private $pump;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPropertyType(): ?string
    {
        return $this->propertyType;
    }

    public function setPropertyType(string $propertyType): self
    {
        $this->propertyType = $propertyType;

        return $this;
    }

    public function getPropertyValue(): ?string
    {
        return $this->propertyValue;
    }

    public function setPropertyValue(string $propertyValue): self
    {
        $this->propertyValue = $propertyValue;

        return $this;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setDateCreatedToCurent() {
        $this->setDateCreated(new \DateTime('now'));
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(?\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getPump(): ?Pump
    {
        return $this->pump;
    }

    public function setPump(?Pump $pump): self
    {
        $this->pump = $pump;

        return $this;
    }
}
