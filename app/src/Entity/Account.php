<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"typ": "exact"})
 * @ORM\Entity(repositoryClass="App\Repository\AccountRepository")
 */
class Account
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Choice({"passive", "active"})
     */
    private $typ;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\OpeningBalance", mappedBy="account", orphanRemoval=true)
     */
    private $openingBalances;

    public function __construct()
    {
        $this->openingBalances = new ArrayCollection();
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

    public function getTyp(): ?string
    {
        return $this->typ;
    }

    public function setTyp(string $typ): self
    {
        $this->typ = $typ;

        return $this;
    }

    /**
     * @return Collection|OpeningBalance[]
     */
    public function getOpeningBalances(): Collection
    {
        return $this->openingBalances;
    }

    public function addOpeningBalance(OpeningBalance $openingBalance): self
    {
        if (!$this->openingBalances->contains($openingBalance)) {
            $this->openingBalances[] = $openingBalance;
            $openingBalance->setAccount($this);
        }

        return $this;
    }

    public function removeOpeningBalance(OpeningBalance $openingBalance): self
    {
        if ($this->openingBalances->contains($openingBalance)) {
            $this->openingBalances->removeElement($openingBalance);
            // set the owning side to null (unless already changed)
            if ($openingBalance->getAccount() === $this) {
                $openingBalance->setAccount(null);
            }
        }

        return $this;
    }
}
