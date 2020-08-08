<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource()
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Project
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
    private $name;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateCreated;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Pump", mappedBy="project", orphanRemoval=true)
     */
    private $pumps;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateUpdated;

    public function __construct()
    {
        $this->pumps = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    /**
     * @return Collection|Pump[]
     */
    public function getPumps(): Collection
    {
        return $this->pumps;
    }

    public function addPump(Pump $pump): self
    {
        if (!$this->pumps->contains($pump)) {
            $this->pumps[] = $pump;
            $pump->setProject($this);
        }

        return $this;
    }

    public function removePump(Pump $pump): self
    {
        if ($this->pumps->contains($pump)) {
            $this->pumps->removeElement($pump);
            // set the owning side to null (unless already changed)
            if ($pump->getProject() === $this) {
                $pump->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @ORM\PreUpdate()
     */
    public function setUpdatedDate() {
        $this->setDateUpdated(new \DateTime('now'));
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedDate() {
        $this->setDateCreated(new \DateTime('now'));
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
