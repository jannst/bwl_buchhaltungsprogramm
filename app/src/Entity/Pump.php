<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PumpRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Pump
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="datetime")
     */
    private $dateManufactured;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateNextInspection;

    /**
     * @Assert\NotBlank()
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="pumps")
     * @ORM\JoinColumn(nullable=false)
     */
    private $project;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PumpProperty", mappedBy="pump", orphanRemoval=true)
     */
    private $pumpProperties;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateUpdated;

    public function __construct()
    {
        $this->pumpProperties = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateManufactured(): ?\DateTimeInterface
    {
        return $this->dateManufactured;
    }

    public function setDateManufactured(\DateTimeInterface $dateManufactured): self
    {
        $this->dateManufactured = $dateManufactured;

        return $this;
    }

    public function getDateNextInspection(): ?\DateTimeInterface
    {
        return $this->dateNextInspection;
    }

    public function setDateNextInspection(?\DateTimeInterface $dateNextInspection): self
    {
        $this->dateNextInspection = $dateNextInspection;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @return Collection|PumpProperty[]
     */
    public function getPumpProperties(): Collection
    {
        return $this->pumpProperties;
    }

    public function addPumpProperty(PumpProperty $pumpProperty): self
    {
        if (!$this->pumpProperties->contains($pumpProperty)) {
            $this->pumpProperties[] = $pumpProperty;
            $pumpProperty->setPump($this);
        }

        return $this;
    }

    public function removePumpProperty(PumpProperty $pumpProperty): self
    {
        if ($this->pumpProperties->contains($pumpProperty)) {
            $this->pumpProperties->removeElement($pumpProperty);
            // set the owning side to null (unless already changed)
            if ($pumpProperty->getPump() === $this) {
                $pumpProperty->setPump(null);
            }
        }

        return $this;
    }

    /**
     * @ORM\PreUpdate()
     */
    public function setDateUpdatedToCurrent() {
        $this->setDateUpdated(new \DateTime('now'));
    }

    public function getDateUpdated(): ?\DateTimeInterface
    {
        return $this->dateUpdated;
    }

    public function setDateUpdated(?\DateTimeInterface $dateUpdated): self
    {
        $this->dateUpdated = $dateUpdated;

        return $this;
    }
}
